const FETCH_SUGGEST = 'FETCH_SUGGEST';
const FETCH_SUGGEST_SUCCESS = 'FETCH_SUGGEST_SUCCESS';
const FETCH_SUGGEST_FAIL = 'FETCH_SUGGEST_FAIL';
const FETCH_SUGGEST_CANCELLED = 'FETCH_SUGGEST_CANCELLED'
const FETCH_SUGGEST_SELECTED = 'FETCH_SUGGEST_SELECTED';
const FETCH_SUGGEST_SELECTED_PRE_SUCCESS = 'FETCH_SUGGEST_SELECTED_PRE_SUCCESS';
const FETCH_SUGGEST_SELECTED_SUCCESS = 'FETCH_SUGGEST_SELECTED_SUCCESS';
const FETCH_SUGGEST_SELECTED_FAIL = 'FETCH_SUGGEST_SELECTED_FAIL';
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const DEFAULT_SUGGEST = 'DEFAULT_SUGGEST';
const CLEAR_SUGGEST = 'CLEAR_SUGGEST';
const SUGGEST_SELECTED = 'SUGGEST_SELECTED';
const SUGGEST_COLUMNS = 'SUGGEST_COLUMNS';
const SUGGEST_COLUMN_COUNT = 'SUGGEST_COLUMN_COUNT';
const SUGGEST_ROW_COUNT = 'SUGGEST_ROW_COUNT';

const initialState = {
  data: null,
  loading: false,
  lastValue: '',
  value: '',
  selected: '', // Purpose is to trigger another Action that will download detailed data for suggestion.
  error: null,
  suggestedDataPre: null, // Original data response stored in memory for post processing.  (i.e. Run-time freeze columns.)
  suggestedData: null,
  suggestedError: null,
  columns: [],
  columnCount: 50,
  rowCount: 20
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SUGGEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUGGEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action},
        error: null
      };
    case FETCH_SUGGEST_FAIL:
      console.log(action)
      return {
        ...state,
        loading: false,
        data: null,
        error: action
      };
    case FETCH_SUGGEST_CANCELLED:
      return {
        ...state,
        loading: false,
        data: null,
        error: null
      }
    case FETCH_SUGGEST_SELECTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUGGEST_SELECTED_PRE_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestedDataPre: {...action},
        suggestedError: null
      };  
    case FETCH_SUGGEST_SELECTED_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestedData: {...action},
        suggestedError: null
      };
    case FETCH_SUGGEST_SELECTED_FAIL:
      return {
        ...state,
        loading: false,
        suggestedData: null,
        suggestedError: action
      };
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };
    case SUGGEST_SELECTED:
      return {
        ...state,
        selected: action.value
      };
    case DEFAULT_SUGGEST:
      return {
        ...initialState,
        data: null,
        selected: action.value
      };
    case CLEAR_SUGGEST:
      return {
        ...initialState,
        lastValue: state.value
      };
    case SUGGEST_COLUMNS:
      return {
        ...state,
        columns: action.columns
      };
    case SUGGEST_COLUMN_COUNT:
      return {
        ...state,
        columnCount: action.columnCount
      };
    case SUGGEST_ROW_COUNT:
      return {
        ...state,
        rowCount: action.rowCount
      };
    default:
      return state;
  }
}

export const fetchSuggest = params => params.suggestType ? ({...params, type: params.suggestType}) : ({ ...params, type: FETCH_SUGGEST });
export const fetchSuggestSelected = params => params.suggestSelectedType ? ({...params, type: params.suggestSelectedType}) : ({ ...params, type: FETCH_SUGGEST_SELECTED });
export const fetchSuggestSuccess = payload => ({ type: FETCH_SUGGEST_SUCCESS, payload });
export const fetchSuggestSelectedPreSuccess = payload => ({ type: FETCH_SUGGEST_SELECTED_PRE_SUCCESS, payload });
export const fetchSuggestSelectedSuccess = payload => ({ type: FETCH_SUGGEST_SELECTED_SUCCESS, payload });
export const fetchSuggestSelectedFail = () => ({ type: FETCH_SUGGEST_SELECTED_FAIL });
export const fetchSuggestFailed = error => ({ type: FETCH_SUGGEST_FAIL, error });
export const updateInputValue = value => ({ type: UPDATE_INPUT_VALUE, value });
export const updateSelected = value => ({ type: SUGGEST_SELECTED, value });
export const defaultSuggestions = value => ({ type: DEFAULT_SUGGEST, value });
export const clearSuggestions = () => ({ type: CLEAR_SUGGEST });
export const setColumns = columns => ({ type: SUGGEST_COLUMNS, columns });
export const setColumnCount = columnCount => ({ type: SUGGEST_COLUMN_COUNT, columnCount });
export const setRowCount = rowCount => ({ type: SUGGEST_ROW_COUNT, rowCount });
