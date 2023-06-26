'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.filterableField =
  exports.items =
  exports.Location =
  exports.locations =
    void 0
exports.locations = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]
var Location
;(function (Location) {
  Location['Dhaka'] = 'Dhaka'
  Location['Chattogram'] = 'Chattogram'
  Location['Barishal'] = 'Barishal'
  Location['Rajshahi'] = 'Rajshahi'
  Location['Sylhet'] = 'Sylhet'
  Location['Comilla'] = 'Comilla'
  Location['Rangpur'] = 'Rangpur'
  Location['Mymensingh'] = 'Mymensingh'
})(Location || (exports.Location = Location = {}))
exports.items = ['page', 'limit', 'sortBy', 'sortOrder']
exports.filterableField = ['searchTerm', 'maxPrice', 'minPrice', 'location']
