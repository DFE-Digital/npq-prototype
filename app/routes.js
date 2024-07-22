const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

require('./routes/v1/routes')(router)
require('./routes/v2/routes')(router)
require('./routes/admin-v2/admin-routes')(router)
require('./routes/id/id-routes')(router)