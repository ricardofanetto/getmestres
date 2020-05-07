import { AddressController } from './controller/AddressController';
import { StorageController } from './controller/StorageController';
import { ServiceProviderController } from './controller/ServiceProviderController';
import { CustomerController } from './controller/CustomerController';
import { SubCategoryController } from './controller/SubCategoryController';
import { UserController } from "./controller/UserController";
import { CategoryController } from "./controller/CategoryController";
import { QuestionController } from './controller/QuestionController';
import { RequestOrderController } from './controller/RequestOrderController';
import { RequestOrderAnswerController } from './controller/RequestOrderAnswerController';

export const Routes = [
    { method: "get", route: "/users", controller: UserController, action: "all" },
    { method: "get", route: "/users/:id", controller: UserController, action: "one" },
    { method: "post", route: "/users", controller: UserController, action: "save" },
    { method: "post", route: "/users/create", controller: UserController, action: "createUser" },
    { method: "post", route: "/users/auth", controller: UserController, action: "auth" },
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },

    { method: "get", route: "/category", controller: CategoryController, action: "all" },
    { method: "get", route: "/category/:id/subcategorys", controller: CategoryController, action: "getAllSubCategorys" },
    { method: "get", route: "/category/:id", controller: CategoryController, action: "one" },
    { method: "post", route: "/category", controller: CategoryController, action: "save" },
    { method: "delete", route: "/category/:id", controller: CategoryController, action: "remove" },
    
    { method: "get", route: "/subcategory", controller: SubCategoryController, action: "all" },
    { method: "get", route: "/subcategory/:id/questions", controller: SubCategoryController, action: "getAllQuestions" },
    { method: "get", route: "/subcategory/:id", controller: SubCategoryController, action: "one" },
    { method: "post", route: "/subcategory", controller: SubCategoryController, action: "save" },
    { method: "delete", route: "/subcategory/:id", controller: SubCategoryController, action: "remove" },

    { method: "get", route: "/question", controller: QuestionController, action: "all" },
    { method: "get", route: "/question/:id", controller: QuestionController, action: "one" },
    { method: "post", route: "/question", controller: QuestionController, action: "save" },
    { method: "delete", route: "/question/:id", controller: QuestionController, action: "remove" }, 

    { method: "get", route: "/customer", controller: CustomerController, action: "all" },
    { method: "get", route: "/customer/my/orders", controller: CustomerController, action: "getMyAllOrders" },
    { method: "get", route: "/customer/:id", controller: CustomerController, action: "one" },
    { method: "post", route: "/customer/auth", controller: CustomerController, action: "auth" },
    { method: "post", route: "/customer", controller: CustomerController, action: "save" },
    { method: "post", route: "/customer/create", controller: CustomerController, action: "createCustomer" },
    { method: "post", route: "/customer/changepassword", controller: CustomerController, action: "changePassword" },
    { method: "delete", route: "/customer/:id", controller: CustomerController, action: "remove" },
    
    { method: "get", route: "/serviceProvider", controller: ServiceProviderController, action: "all" },
    { method: "get", route: "/serviceProvider/orders/availables", controller: ServiceProviderController, action: "getAllOrdersAvailables" },
    { method: "get", route: "/serviceProvider/orders/my", controller: ServiceProviderController, action: "getMyOrders" },
    { method: "get", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "one" },
    { method: "post", route: "/serviceProvider", controller: ServiceProviderController, action: "save" },
    { method: "post", route: "/serviceProvider/auth", controller: ServiceProviderController, action: "auth" },
    { method: "post", route: "/serviceProvider/create", controller: ServiceProviderController, action: "createServiceProvider" },
    { method: "delete", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "remove" },
    
    { method: "get", route: "/request", controller: RequestOrderController, action: "all" },
    { method: "get", route: "/request/:id", controller: RequestOrderController, action: "one" },
    { method: "post", route: "/request", controller: RequestOrderController, action: "save" },
    { method: "put", route: "/request/:id/accept", controller: RequestOrderController, action: "accept" },
    { method: "put", route: "/request/:id/done", controller: RequestOrderController, action: "done" },
    { method: "delete", route: "/request/:id", controller: RequestOrderController, action: "remove" },

    { method: "get", route: "/requestAnswer/:orderUid/all", controller: RequestOrderAnswerController, action: "all" },
    { method: "post", route: "/requestAnswer", controller: RequestOrderAnswerController, action: "save" },
    { method: "delete", route: "/requestAnswer/:id", controller: RequestOrderAnswerController, action: "remove" }, 

    { method: "get", route: "/storage/:filename", controller: StorageController, action: "getFile" },

    { method: "get", route: "/address/", controller: AddressController, action: "getAllStates" },
    { method: "get", route: "/address/:state", controller: AddressController, action: "getAllCities" },

];