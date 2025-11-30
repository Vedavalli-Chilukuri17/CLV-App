import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import clvDashboard from '../../client/clv-dashboard.html'

UiPage({
    $id: Now.ID['clv-dashboard-page'],
    endpoint: 'x_hete_clv_maximiz_dashboard.do',
    description: 'CLV Maximizer Analytics Dashboard - Interactive AI-Powered Reports',
    category: 'general',
    html: clvDashboard,
    direct: true,
})