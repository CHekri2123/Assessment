
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


Route.get('/displayCustomerData','CustomersController.displayData')
Route.post('/insertCustomerData','CustomersController.inserData')
Route.put('/updateCustomerData/:id','CustomersController.editData')
Route.delete('/deleteCustomerData/:id','CustomersController.deleteData')
Route.post('/searchCustomerData','CustomersController.searchQuery')
Route.get('/sortCustomerIdByAscending','CustomersController.sortAscendingById')
Route.get('/sortCustomerIdByDescending','CustomersController.sortDescendingById')
Route.get('/sortCustomerNameByAscending','CustomersController.sortAscendingByCustomerName')
Route.get('/sortCustomerNameByDescending','CustomersController.sortDescendingByCustomerName')
Route.get('/sortBranchNameByAscending','CustomersController.sortAscendingByBranchName')
Route.get('/sortBranchNameByDescending','CustomersController.sortDescendingByBranchName')



Route.get('/displayHotelData','HoteldatabasesController.displayData')
Route.post('/insertHotelData','HoteldatabasesController.insertData')
Route.put('/updateHotelData/:id','HoteldatabasesController.editData')
Route.delete('/deleteHotelData/:id','HoteldatabasesController.deleteData')
Route.post('/searchHotelData','HoteldatabasesController.searchQuery')