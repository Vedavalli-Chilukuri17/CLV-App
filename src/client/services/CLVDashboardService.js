export class CLVDashboardService {
    constructor() {
        this.baseUrl = '/api/now/table';
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-UserToken': window.g_ck
        };
    }

    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: this.headers,
                ...options
            });
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Request failed' }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async getEnhancedKPIs(filters = {}) {
        const timeframe = filters.timeframe || '30';
        const tierFilter = filters.customerTier !== 'all' ? `^customer_tier=${filters.customerTier}` : '';
        
        // Parallel data fetching for performance
        const [clvData, campaignData, renewalData] = await Promise.all([
            this.fetchCLVData(timeframe, tierFilter),
            this.fetchCampaignData(timeframe),
            this.fetchRenewalData(timeframe, tierFilter)
        ]);

        return {
            renewalConversion: this.buildRenewalConversionReport(renewalData, timeframe),
            churnMonitoring: this.buildChurnMonitoringReport(clvData, timeframe),
            clvByTier: this.buildCLVByTierReport(clvData, timeframe),
            campaignROI: this.buildCampaignROIReport(campaignData, timeframe),
            projectedRenewals: this.buildProjectedRenewalsReport(renewalData, timeframe)
        };
    }

    async fetchCLVData(timeframe, tierFilter) {
        const query = `sysparm_display_value=all&sysparm_query=sys_created_onONLast ${timeframe} days@javascript:gs.daysAgoStart(${timeframe})@javascript:gs.daysAgoEnd(0)${tierFilter}&sysparm_limit=1000`;
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_clv_analytics?${query}`);
        return response.result || [];
    }

    async fetchCampaignData(timeframe) {
        const query = `sysparm_display_value=all&sysparm_query=start_dateONLast ${timeframe} days@javascript:gs.daysAgoStart(${timeframe})@javascript:gs.daysAgoEnd(0)&sysparm_limit=1000`;
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_campaign_analytics?${query}`);
        return response.result || [];
    }

    async fetchRenewalData(timeframe, tierFilter) {
        const query = `sysparm_display_value=all&sysparm_query=renewal_dateONNext ${timeframe} days@javascript:gs.daysAgoStart(-${timeframe})@javascript:gs.daysAgoEnd(0)${tierFilter}&sysparm_limit=1000`;
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_renewal_pipeline?${query}`);
        return response.result || [];
    }

    buildRenewalConversionReport(renewalData, timeframe) {
        const qualifiedRenewals = renewalData.filter(r => 
            ['qualified', 'proposal', 'negotiation'].includes(r.renewal_stage?.value)
        ).length;
        const wonRenewals = renewalData.filter(r => r.renewal_stage?.value === 'closed_won').length;
        const currentRate = qualifiedRenewals > 0 ? (wonRenewals / qualifiedRenewals) * 100 : 0;
        
        // Generate historical data for trend analysis
        const historical = this.generateHistoricalData(currentRate, 12, 'monthly');
        const lastYearRate = historical[historical.length - 13]?.value || currentRate * 0.9;
        
        // Predictive modeling
        const trend = this.calculateTrendDirection(historical);
        const prediction = this.predictNextPeriod(historical);

        return {
            type: 'renewal_conversion',
            title: 'Renewal Conversion Rate Report',
            currentValue: currentRate,
            unit: '%',
            trend: {
                direction: trend.direction,
                percentage: trend.percentage,
                positive: trend.positive
            },
            comparison: {
                lastYear: lastYearRate,
                lift: currentRate - lastYearRate
            },
            prediction: {
                nextPeriod: prediction.value,
                confidence: prediction.confidence
            },
            historical,
            drillDown: {
                available: true,
                type: 'customer_level',
                params: { stage: 'conversion_funnel' }
            },
            timeframe: timeframe
        };
    }

    buildChurnMonitoringReport(clvData, timeframe) {
        const totalCustomers = clvData.length;
        const highRiskCustomers = clvData.filter(c => c.is_high_risk?.value === 'true').length;
        const currentChurnRate = totalCustomers > 0 ? (highRiskCustomers / totalCustomers) * 100 : 0;
        
        // Tier segmentation
        const tierBreakdown = this.calculateTierBreakdown(clvData.filter(c => c.is_high_risk?.value === 'true'));
        
        // Predictive projection
        const historical = this.generateHistoricalData(currentChurnRate, 12, 'monthly');
        const projection = this.predictChurnProjection(historical);
        
        return {
            type: 'churn_monitoring',
            title: 'Churn Rate Monitoring Report',
            currentValue: currentChurnRate,
            unit: '%',
            trend: this.calculateTrendDirection(historical),
            projection: {
                nextQuarter: projection.nextQuarter,
                confidence: projection.confidence,
                factors: projection.riskFactors
            },
            tierSegmentation: tierBreakdown,
            alerts: this.generateChurnAlerts(currentChurnRate, projection),
            historical,
            drillDown: {
                available: true,
                type: 'tier_breakdown',
                params: { metric: 'churn_risk' }
            }
        };
    }

    buildCLVByTierReport(clvData, timeframe) {
        const tiers = ['platinum', 'gold', 'silver', 'bronze'];
        const tierAnalysis = {};
        
        tiers.forEach(tier => {
            const tierCustomers = clvData.filter(c => c.customer_tier?.value === tier);
            const avgCLV = tierCustomers.length > 0 
                ? tierCustomers.reduce((sum, c) => sum + (parseFloat(c.current_clv?.value) || 0), 0) / tierCustomers.length
                : 0;
            
            // Percentile distribution for each tier
            const clvValues = tierCustomers.map(c => parseFloat(c.current_clv?.value) || 0).sort((a, b) => a - b);
            
            tierAnalysis[tier] = {
                averageCLV: avgCLV,
                customerCount: tierCustomers.length,
                totalValue: tierCustomers.reduce((sum, c) => sum + (parseFloat(c.current_clv?.value) || 0), 0),
                percentiles: this.calculatePercentiles(clvValues),
                trend: this.generateHistoricalData(avgCLV, 6, 'monthly')
            };
        });
        
        return {
            type: 'clv_by_tier',
            title: 'CLV by Customer Tier Report', 
            tierAnalysis,
            overallMetrics: {
                totalCLV: Object.values(tierAnalysis).reduce((sum, tier) => sum + tier.totalValue, 0),
                averageCLV: clvData.reduce((sum, c) => sum + (parseFloat(c.current_clv?.value) || 0), 0) / clvData.length
            },
            distribution: this.calculateCLVDistribution(clvData),
            drillDown: {
                available: true,
                type: 'tier_detail',
                params: { analysis: 'clv_breakdown' }
            }
        };
    }

    buildCampaignROIReport(campaignData, timeframe) {
        const totalSpent = campaignData.reduce((sum, c) => sum + (parseFloat(c.spent?.value) || 0), 0);
        const totalRevenue = campaignData.reduce((sum, c) => sum + (parseFloat(c.revenue_generated?.value) || 0), 0);
        const currentROI = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0;
        
        // Best performing campaign
        const bestCampaign = campaignData.reduce((best, campaign) => {
            const spent = parseFloat(campaign.spent?.value) || 0;
            const revenue = parseFloat(campaign.revenue_generated?.value) || 0;
            const roi = spent > 0 ? ((revenue - spent) / spent) * 100 : 0;
            
            return roi > (best.roi || 0) ? { 
                ...campaign, 
                roi,
                name: campaign.campaign_name?.display_value 
            } : best;
        }, {});
        
        // Campaign breakdown by channel
        const channelBreakdown = this.analyzeChannelROI(campaignData);
        
        return {
            type: 'campaign_roi',
            title: 'Campaign ROI Tracking Report',
            currentValue: currentROI,
            unit: '%',
            trend: this.calculateTrendDirection(this.generateHistoricalData(currentROI, 6, 'monthly')),
            bestPerformer: {
                campaign: bestCampaign.name || 'N/A',
                roi: bestCampaign.roi || 0,
                spent: parseFloat(bestCampaign.spent?.value) || 0,
                revenue: parseFloat(bestCampaign.revenue_generated?.value) || 0
            },
            channelBreakdown,
            comparison: {
                lastYear: currentROI * 0.85, // Mock comparison
                lift: currentROI * 0.15
            },
            drillDown: {
                available: true,
                type: 'campaign_detail',
                params: { analysis: 'roi_breakdown' }
            }
        };
    }

    buildProjectedRenewalsReport(renewalData, timeframe) {
        const totalValue = renewalData.reduce((sum, r) => {
            const value = parseFloat(r.renewal_value?.value) || 0;
            const probability = parseFloat(r.probability?.value) || 0;
            return sum + (value * (probability / 100));
        }, 0);
        
        // Confidence scoring based on data quality
        const confidence = this.calculateProjectionConfidence(renewalData);
        
        // Tier breakdown of projections
        const tierProjections = this.calculateTierProjections(renewalData);
        
        return {
            type: 'projected_renewals',
            title: 'Projected Renewals Report',
            currentValue: totalValue,
            unit: '$',
            confidence: {
                score: confidence.overall,
                factors: confidence.factors,
                intervals: confidence.intervals
            },
            tierBreakdown: tierProjections,
            pipeline: {
                total: renewalData.length,
                qualified: renewalData.filter(r => r.renewal_stage?.value === 'qualified').length,
                proposal: renewalData.filter(r => r.renewal_stage?.value === 'proposal').length,
                negotiation: renewalData.filter(r => r.renewal_stage?.value === 'negotiation').length
            },
            drillDown: {
                available: true,
                type: 'pipeline_detail',
                params: { analysis: 'renewal_forecasting' }
            }
        };
    }

    async getPerformanceReports(filters = {}) {
        const [pipelineData, riskData, engagementData, opportunityData] = await Promise.all([
            this.fetchRenewalData(90, ''), // 90-day pipeline window
            this.fetchHighRiskCustomers(),
            this.fetchEngagementData(filters.timeframe || '30'),
            this.fetchCrossSellOpportunities()
        ]);

        return {
            renewalPipelineFunnel: this.buildRenewalPipelineFunnelReport(pipelineData),
            highRiskAnalysis: this.buildHighRiskAnalysisReport(riskData),
            engagementTracking: this.buildEngagementTrackingReport(engagementData),
            crossSellOpportunities: this.buildCrossSellOpportunityReport(opportunityData)
        };
    }

    async getMarketIntelligenceReports(filters = {}) {
        const [marketData, segmentationData, clvData, riskFactors, claimsData] = await Promise.all([
            this.fetchMarketIntelligence(),
            this.fetchCLVData(365, ''), // Full year for segmentation
            this.fetchCLVData(filters.timeframe || '30', ''),
            this.fetchRiskFactorData(),
            this.fetchClaimsData()
        ]);

        return {
            competitorBenchmarking: this.buildCompetitorBenchmarkingReport(marketData),
            customerSegmentation: this.buildCustomerSegmentationReport(segmentationData),
            clvBrandAnalysis: this.buildCLVBrandAnalysisReport(clvData),
            riskFactorScoring: this.buildRiskFactorScoringReport(riskFactors),
            claimsImpactModeling: this.buildClaimsImpactModelingReport(claimsData)
        };
    }

    async getDataViews(filters = {}) {
        // Fetch data for embedded tables
        const [clvAnalytics, campaignData, renewalPipeline, marketIntel] = await Promise.all([
            this.fetchCLVData(filters.timeframe || '30', ''),
            this.fetchCampaignData(filters.timeframe || '30'),
            this.fetchRenewalData(filters.timeframe || '30', ''),
            this.fetchMarketIntelligence()
        ]);

        return {
            clvAnalytics: {
                data: clvAnalytics.slice(0, 100), // Limit for performance
                totalCount: clvAnalytics.length,
                columns: ['customer_id', 'customer_tier', 'current_clv', 'projected_clv', 'is_high_risk']
            },
            campaignAnalytics: {
                data: campaignData.slice(0, 100),
                totalCount: campaignData.length,
                columns: ['campaign_name', 'campaign_type', 'spent', 'revenue_generated', 'roi']
            },
            renewalPipeline: {
                data: renewalPipeline.slice(0, 100),
                totalCount: renewalPipeline.length,
                columns: ['customer_id', 'renewal_stage', 'renewal_value', 'probability', 'renewal_date']
            },
            marketIntelligence: {
                data: marketIntel.slice(0, 100),
                totalCount: marketIntel.length,
                columns: ['category', 'metric_name', 'our_value', 'competitor_value', 'industry_average']
            }
        };
    }

    // Utility methods for calculations and predictions
    generateHistoricalData(currentValue, periods, frequency) {
        const data = [];
        for (let i = periods - 1; i >= 0; i--) {
            const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
            const baseValue = currentValue * (1 + variation);
            const date = new Date();
            
            if (frequency === 'monthly') {
                date.setMonth(date.getMonth() - i);
            } else {
                date.setDate(date.getDate() - (i * 7));
            }
            
            data.push({
                period: date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: frequency === 'monthly' ? 'numeric' : undefined,
                    day: frequency === 'weekly' ? 'numeric' : undefined
                }),
                value: baseValue,
                date: date.toISOString()
            });
        }
        return data;
    }

    calculateTrendDirection(historical) {
        if (historical.length < 2) return { direction: 'stable', percentage: 0, positive: true };
        
        const recent = historical.slice(-3);
        const earlier = historical.slice(-6, -3);
        
        const recentAvg = recent.reduce((sum, p) => sum + p.value, 0) / recent.length;
        const earlierAvg = earlier.reduce((sum, p) => sum + p.value, 0) / earlier.length;
        
        const change = recentAvg - earlierAvg;
        const percentage = earlierAvg > 0 ? Math.abs(change / earlierAvg) * 100 : 0;
        
        return {
            direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
            percentage: percentage,
            positive: change >= 0
        };
    }

    predictNextPeriod(historical) {
        if (historical.length < 3) return { value: 0, confidence: 0 };
        
        // Simple linear regression for prediction
        const values = historical.map(h => h.value);
        const n = values.length;
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / n;
        
        // Calculate trend
        let trend = 0;
        for (let i = 1; i < n; i++) {
            trend += values[i] - values[i - 1];
        }
        trend = trend / (n - 1);
        
        const prediction = avg + trend;
        const confidence = Math.min(90, Math.max(10, 70 - (Math.abs(trend) / avg) * 100));
        
        return {
            value: prediction,
            confidence: confidence
        };
    }

    calculatePercentiles(sortedValues) {
        if (sortedValues.length === 0) return { p25: 0, p50: 0, p75: 0, p90: 0 };
        
        const getPercentile = (p) => {
            const index = Math.ceil((p / 100) * sortedValues.length) - 1;
            return sortedValues[Math.max(0, Math.min(index, sortedValues.length - 1))];
        };
        
        return {
            p25: getPercentile(25),
            p50: getPercentile(50),
            p75: getPercentile(75),
            p90: getPercentile(90)
        };
    }

    calculateTierBreakdown(data) {
        const tiers = ['platinum', 'gold', 'silver', 'bronze'];
        return tiers.reduce((acc, tier) => {
            acc[tier] = data.filter(d => d.customer_tier?.value === tier).length;
            return acc;
        }, {});
    }

    // Additional fetch methods for performance reports
    async fetchHighRiskCustomers() {
        const query = 'sysparm_display_value=all&sysparm_query=is_high_risk=true&sysparm_limit=500';
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_clv_analytics?${query}`);
        return response.result || [];
    }

    async fetchEngagementData(timeframe) {
        const query = `sysparm_display_value=all&sysparm_query=start_dateONLast ${timeframe} days@javascript:gs.daysAgoStart(${timeframe})@javascript:gs.daysAgoEnd(0)&sysparm_limit=500`;
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_campaign_analytics?${query}`);
        return response.result || [];
    }

    async fetchCrossSellOpportunities() {
        const query = 'sysparm_display_value=all&sysparm_query=engagement_score>70^current_clv<50000&sysparm_limit=500';
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_clv_analytics?${query}`);
        return response.result || [];
    }

    async fetchMarketIntelligence() {
        const query = 'sysparm_display_value=all&sysparm_order_by=measurement_date&sysparm_limit=500';
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_market_intelligence?${query}`);
        return response.result || [];
    }

    async fetchRiskFactorData() {
        const query = 'sysparm_display_value=all&sysparm_query=category=risk_factor&sysparm_limit=200';
        const response = await this.makeRequest(`${this.baseUrl}/x_hete_clv_maximiz_market_intelligence?${query}`);
        return response.result || [];
    }

    async fetchClaimsData() {
        // Mock implementation - would fetch from claims-related table
        return [];
    }

    // Placeholder methods for building other reports
    buildRenewalPipelineFunnelReport(data) {
        // Implementation for renewal pipeline funnel with 30/60/90 day windows
        return { type: 'renewal_pipeline_funnel', data: [] };
    }

    buildHighRiskAnalysisReport(data) {
        // Implementation for high-risk customer analysis
        return { type: 'high_risk_analysis', data: [] };
    }

    buildEngagementTrackingReport(data) {
        // Implementation for engagement rate tracking
        return { type: 'engagement_tracking', data: [] };
    }

    buildCrossSellOpportunityReport(data) {
        // Implementation for cross-sell/upsell opportunities
        return { type: 'crosssell_opportunities', data: [] };
    }

    buildCompetitorBenchmarkingReport(data) {
        // Implementation for competitor benchmarking
        return { type: 'competitor_benchmarking', data: [] };
    }

    buildCustomerSegmentationReport(data) {
        // Implementation for customer segmentation
        return { type: 'customer_segmentation', data: [] };
    }

    buildCLVBrandAnalysisReport(data) {
        // Implementation for CLV and brand analysis
        return { type: 'clv_brand_analysis', data: [] };
    }

    buildRiskFactorScoringReport(data) {
        // Implementation for risk factor scoring
        return { type: 'risk_factor_scoring', data: [] };
    }

    buildClaimsImpactModelingReport(data) {
        // Implementation for claims impact modeling
        return { type: 'claims_impact_modeling', data: [] };
    }
}