import { HttpContext } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import Customer from "App/Models/Customer"

export default class CustomersController {
    public async displayData({ }: HttpContext) {
        const user = await Customer.all()
        return user
    }
    public async inserData({ request, response }: HttpContext) {
        const dataInsert = new Customer();
        dataInsert.id = request.input('id');
        dataInsert.customer_name = request.input('customer_name');
        dataInsert.branch_name = request.input('branch_name');
        await dataInsert.save()
        return response.json({ dataInsert })
    }
    public async editData({ request }: HttpContext) {
        const data = request.params().id
        const editInsert = await Customer.query().where('customer_name', '=', data).update({
            "id": request.input('id'),
            "customer_name": request.input('customer_name'),
            "branch_name": request.input('branch_name')
        })  
        return editInsert
    }
    public async deleteData({ request }: HttpContext) {
        const deleteItem = await Customer.findByOrFail('id', request.params().id)
        deleteItem.delete()
        await deleteItem.save()
        return deleteItem
    }
    public async searchQuery({ request }: HttpContext) {
        var data = request.input('term')
        const searchData = await Database
            .from('customers')
            .select('*')
            .where((query) => {
                if (/^[0-9]/.test(data)) {
                    query.where('id', data)
                }
            })
            .orWhere((query: any) => {
                query
                    .where("customer_name", "ilike", `%${data}%`)
                    .orWhere("branch_name", "ilike", `%${data}%`)
            })
        return searchData
    }

    public async sortAscendingById() {
        return Customer.query().orderBy("id", "asc")
    }
    public async sortDescendingById() {
        return Customer.query().orderBy("id", "desc")
    }
    public async sortAscendingByCustomerName() {
        return Customer.query().orderBy("customer_name", "asc")
    }
    public async sortDescendingByCustomerName() {
        return Customer.query().orderBy("customer_name", "desc")
    }
    public async sortAscendingByBranchName() {
        return Customer.query().orderBy("branch_name", "asc")
    }
    public async sortDescendingByBranchName() {
        return Customer.query().orderBy("branch_name", "desc")
    }
}
