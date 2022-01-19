const getListTagReducer = (state: object[] = [], action: any):Array<any> => {
  switch (action.type) {
    case "GET_LIST_TAG":
      return action.payload;

    default:
      return state;
  }
};

export default getListTagReducer;
