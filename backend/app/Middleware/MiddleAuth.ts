import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'

export default class MiddleAuth {

  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {

    // code for middleware goes here. ABOVE THE NEXT CALL
    if(appKey!=request.header('appKey')){

      response.status(401).send('No Proper App Key')

    }

    await next()

  }
}
