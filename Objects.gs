// These patterns are courtessy of the New Vision Blog found here https://sites.google.com/a/newvisions.org/scripts_resources/technical-blog/readingandwritingdatainsheetsviaspreadsheetapp
//
// setRowsData fills in one row of data per object defined in the objects Array.
// For every Column, it checks if data objects define a value for it.
// Arguments:
//   - sheet: the Sheet Object where the data will be written
//   - objects: an Array of Objects, each of which contains data for a row
//   - optHeadersRange: a Range of cells where the column headers are defined. This
//     defaults to the entire first row in sheet.
//   - optFirstDataRowIndex: index of the first row where data should be written. This
//     defaults to the row immediately below the headers.

  function setRowsData_nonNormalized1(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
  var headersRange = optHeadersRange || sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var firstDataRowIndex = optFirstDataRowIndex || headersRange.getRowIndex() + 1;
  var headers = headersRange.getValues()[0];
  var data = []
  for (var i = 0; i < objects.length; ++i) {
    var values = []
    for (var j = 0; j < headers.length; ++j) {
      var header = headers[j];
      // If the header is non-empty and the object value is 0...
      if ((header.length > 0)&&(objects[i][header] === 0)&&(!(isNaN(parseInt(objects[i][header]))))) {
        values.push(0);
      }
      // If the header is empty or the object value is empty...
      else if ((!(header.length > 0)) || (objects[i][header]=='') || (!objects[i][header])) {
        values.push('');
      }
      else {
        values.push(objects[i][header]);
      }
    }
    data.push(values);
  }
  var destinationRange2 = sheet.getRange(firstDataRowIndex, headersRange.getColumnIndex(),
      objects.length, headers.length);
      destinationRange.setValues(data);
}

// getRowsData iterates row by row in the input range and returns an array of objects.
// Each object contains all the data for a given row, indexed by its normalized column name.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed
//   - range: the exact range of cells where the data is stored
//       This argument is optional and it defaults to all the cells except those in the first row
//       or all the cells below columnHeadersRowIndex (if defined).
//   - columnHeadersRowIndex: specifies the row number where the column names are stored.
//       This argument is optional and it defaults to the row immediately above range;
// Returns an Array of objects.

/*
 * @param {sheet} sheet with data to be pulled from.
 * @param {range} range where the data is in the sheet, headers are above
 * @param {row} 
 */
function getRowsData(sheet, range, columnHeadersRowIndex) {
  if (sheet.getLastRow() < 2){
    return [];
  }
  var headersIndex = columnHeadersRowIndex || (range ? range.getRowIndex() - 1 : 1);
  var dataRange = range ||
    sheet.getRange(headersIndex+1, 1, sheet.getLastRow() - headersIndex, sheet.getLastColumn());
  var numColumns = dataRange.getLastColumn() - dataRange.getColumn() + 1;
  var headersRange = sheet.getRange(headersIndex, dataRange.getColumn(), 1, numColumns);
  var headers = headersRange.getValues()[0];
  return getObjects_(dataRange.getValues(), normalizeHeaders(headers));
}

// For every row of data in data, generates an object that contains the data. Names of
// object fields are defined in keys.
// Arguments:
//   - data: JavaScript 2d array
//   - keys: Array of Strings that define the property names for the objects to create

function getObjects_(data, keys) {
  var objects = [];
  var timeZone = Session.getScriptTimeZone();
  for (var i = 0; i < data.length; ++i) {
    var object = {};
    var hasData = false;
    for (var j = 0; j < data[i].length; ++j) {
      var cellData = data[i][j];
      if (isCellEmpty_(cellData)) {
        object[keys[j]] = '';
        continue;
      }
      object[keys[j]] = cellData;
      hasData = true;
    }
    if (hasData) {
      objects.push(object);
    }
  }
  return objects;
}

// Returns an Array of normalized Strings.
// Empty Strings are returned for all Strings that could not be successfully normalized.
// Arguments:
//   - headers: Array of Strings to normalize

function normalizeHeaders(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    keys.push(normalizeHeader(headers[i]));
  }
  return keys;
}

// Normalizes a string, by removing all alphanumeric characters and using mixed case
// to separate words. The output will always start with a lower case letter.
// This function is designed to produce JavaScript object property names.
// Arguments:
//   - header: string to normalize
// Examples:
//   "First Name" -> "firstName"
//   "Market Cap (millions) -> "marketCapMillions
//   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"

function normalizeHeader(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum_(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit_(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }
  return key;
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}
// Returns true if the character char is alphabetical, false otherwise.
function isAlnum_(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit_(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit_(char) {
  return char >= '0' && char <= '9';
}
