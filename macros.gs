//////////////////////////////////////////////////////////////////////
//
// Code Generated by Googles Macro tool found on the spreadsheet page 
// Found under Tools / Marco Recorder/ Record Macro
// Not Relevant to anything either then a specific
// way of copying the end points from the Lightspeed API Docs 
//
//////////////////////////////////////////////////////////////////////



function UntitledMacro() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(-2, -2).activate();
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  spreadsheet.getCurrentCell().offset(1, 0).activate();
  spreadsheet.getCurrentCell().offset(1, 0).activate();
  spreadsheet.getCurrentCell().offset(0, -2).activate();
  spreadsheet.getCurrentCell().offset(-1, 0).activate();
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  spreadsheet.getCurrentCell().offset(1, 0).activate();
};

function UntitledMacro1() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().setValue('Test ');
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
  spreadsheet.getCurrentCell().offset(1, 0).activate();
  spreadsheet.getCurrentCell().setValue('At ');
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().offset(-1, 0).activate();
  spreadsheet.getCurrentCell().setValue('the ');
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
  spreadsheet.getCurrentCell().offset(1, 0).activate();
  spreadsheet.getCurrentCell().setValue('Bottom');
  spreadsheet.getCurrentCell().offset(1, 0).activate();
};

function SplitTextData() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn() + 2, sheet.getMaxRows(), 1).activate();
  spreadsheet.getActiveRange().splitTextToColumns();
  spreadsheet.getCurrentCell().offset(0, 0, 1001, 1).activate();
  spreadsheet.getActiveRange().splitTextToColumns('(');
  spreadsheet.getCurrentCell().offset(0, 1, 1001, 2).activate();
  spreadsheet.getCurrentCell().offset(0, 0, 1001, 1).splitTextToColumns(') ');
  spreadsheet.getCurrentCell().activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().offset(0, 0, 1, 2).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().offset(0, -1).activate();
  spreadsheet.getCurrentCell().offset(0, 1, 34, 2).moveTo(spreadsheet.getActiveRange());
};

function FormatNewINserts() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(-4, 0).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  spreadsheet.getCurrentCell().offset(0, -1).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  spreadsheet.getCurrentCell().offset(0, 3).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.UP).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().offset(0, 0, 39, 2).activate();
  spreadsheet.getActiveRangeList().setFontWeight('bold')
  .setFontWeight(null);
  spreadsheet.getCurrentCell().offset(4, 0).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setFontWeight('bold');
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setFontWeight(null)
  .setFontWeight('bold');
  spreadsheet.setCurrentCell(spreadsheet.getCurrentCell().offset(1, 0));
};

function Groupendpoints() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(4, 1, 1, 3).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().offset(0, -1).activate();
  spreadsheet.getCurrentCell().offset(0, 1, 34, 3).moveTo(spreadsheet.getActiveRange());
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.COLUMNS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(spreadsheet.getCurrentCell().getRow(), 1, 1, sheet.getMaxColumns()).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 1).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 3).activate();
  spreadsheet.setCurrentCell(currentCell);
  spreadsheet.getActiveRange().shiftColumnGroupDepth(1);
  spreadsheet.getActiveSheet().getColumnGroup(5, 1).collapse();
};

function Group() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(6, 1, 1, 3).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.UP).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
  spreadsheet.getCurrentCell().offset(5, -1).activate();
  spreadsheet.getCurrentCell().offset(0, 1, 18, 3).moveTo(spreadsheet.getActiveRange());
  spreadsheet.getCurrentCell().offset(0, 1, 1, 3).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell().offset(-6, 2);
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 3).activate();
  spreadsheet.setCurrentCell(currentCell);
  spreadsheet.getActiveRange().shiftColumnGroupDepth(1);
  spreadsheet.getActiveSheet().getColumnGroup(25, 1).collapse();
  spreadsheet.getCurrentCell().activate();
};

function FormatandGroup() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getCurrentCell().offset(1, 1, 1, 3).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.UP).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().offset(0, -1).activate();
  spreadsheet.getCurrentCell().offset(0, 1, 58, 3).moveTo(spreadsheet.getActiveRange());
  spreadsheet.getActiveRangeList().setFontWeight('bold')
  .setFontWeight(null);
  spreadsheet.getCurrentCell().offset(0, 1).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.UP).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.UP).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setFontWeight('bold');
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 1).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell().offset(-7, 2);
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 3).activate();
  spreadsheet.setCurrentCell(currentCell);
  spreadsheet.getActiveRange().shiftColumnGroupDepth(1);
  spreadsheet.getActiveSheet().getColumnGroup(29, 1).collapse();
  spreadsheet.getCurrentCell().activate();
};

function FormatafterSplit() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn() + 1, sheet.getMaxRows(), 3).activate()
  .shiftColumnGroupDepth(1);
  spreadsheet.getCurrentCell().offset(7, 0, 1, 3).activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().offset(-1, 0).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
  spreadsheet.getCurrentCell().offset(2, -1).activate();
  spreadsheet.getCurrentCell().offset(0, 1, 996, 3).moveTo(spreadsheet.getActiveRange());
  spreadsheet.getCurrentCell().offset(0, 2).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.COLUMNS).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 1).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setFontWeight(null)
  .setFontWeight('bold')
  .setFontWeight(null);
  spreadsheet.getCurrentCell().offset(1, 0).activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.ROWS).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, spreadsheet.getCurrentCell().getColumn(), sheet.getMaxRows(), 1).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  spreadsheet.getActiveSheet().getColumnGroup(37, 1).collapse();
};