import { App } from 'vue'
import registerElement from './register-elementPlus'
import registerProperties from './register-properties'
export function globalRegister(app: App): void {
  // registerElement(app)
  app.use(registerElement)
  app.use(registerProperties)
}
