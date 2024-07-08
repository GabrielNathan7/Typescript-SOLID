export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface IndividuaCustomerProtocol {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface EnterpriseCustomerProtocol {
  name: string;
  cnpj: string;
}
