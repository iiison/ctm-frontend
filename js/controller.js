import Base from '$lib/Base'
import View from '$js/View'
import Model from '$js/models/Model'
import initRoutes from '$js/routes'
import * as pageConfigs from '$pageConfs'

import { getTemplate } from './utils'


/**
 * Main Class, instentiates View and Model
 */
class Controller extends Base {
  /**
   * Controller Class Contructor,
   * Initializes View, Model and Routes
   */
  constructor() {
    super()

    this.view = View.create()
    this.model = new Model()

    this.view.on('change:viewName', (viewName) => {
      getTemplate(viewName)
        .then(({ template, styles }) => {
          this.view.render(template, { value : `${viewName} page`, styles })
          pageConfigs[viewName].setupPageData()
        })
    })
  }

  /**
   * Static Class member, just call `create` method to
   * instantiate the class
   * @return {Controller}  instance of controller class
   */
  static create() {
    return new Controller()
  }
}

const controller = Controller.create()

initRoutes(controller)
window.controller = controller

export default controller

/*
document.addEventListener("DOMContentLoaded", function(event) {
  window.
});
*/
