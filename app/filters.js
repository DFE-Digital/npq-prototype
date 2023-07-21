const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const prototypeFilters = require('@x-govuk/govuk-prototype-filters');

  module.exports = function (env) {
    /**
     * Instantiate object used to store the methods registered as a
     * 'filter' (of the same name) within nunjucks. You can override
     * gov.uk core filters by creating filter methods of the same name.
     * @type {Object}
     */
    var filters = prototypeFilters

    // Existing filter
    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    return filters
  }