sap.ui.define([], function () {
  const oModel = OData
  return {
    read: (path) => {
      return new Promise((res, rej) => {
        oModel.read(path, {
          success: res,
          error: rej
        })
      })
    }
  }
})