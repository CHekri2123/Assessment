
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/displayCustomerData','CustsController.displayData').middleware('MiddleAuth')
Route.post('/insertCustomerData','CustsController.inserData')
Route.put('/updateCustomerData/:id','CustsController.editData')
Route.delete('/deleteCustomerData/:id','CustsController.deleteData')
Route.post('/searchCustomerData','CustsController.searchQuery')
Route.post('/sortCustomerDataAsc','CustsController.sortAscending')
Route.post('/sortCustomerDataDesc','CustsController.sortDescending')



Route.get('/displayHotelData','HoteldatabasesController.displayData')
Route.post('/insertHotelData','HoteldatabasesController.insertData')
Route.put('/updateHotelData/:id','HoteldatabasesController.editData')
Route.delete('/deleteHotelData/:id','HoteldatabasesController.deleteData')
Route.post('/searchHotelData','HoteldatabasesController.searchQuery')
Route.post('/sortHotelDataAsc','HoteldatabasesController.sortAscending')
Route.post('/sortHotelDataDesc','HoteldatabasesController.sortDescending')
