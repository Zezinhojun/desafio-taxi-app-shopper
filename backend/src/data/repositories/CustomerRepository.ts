import { Customer } from "@domain/entities/Customer";
import { ICustomerRepository } from "@domain/interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
    private readonly customer: Customer[] = []

    async findById(id: string): Promise<Customer | null> {
        const customer = this.customer.find(c => c.id === id)
        return customer || null
    }

}