import { SubCategoryController } from './controller/SubCategoryController';
import { UserController } from "./controller/UserController";
import { CategoryController } from "./controller/CategoryController";
import { QuestionController } from './controller/QuestionController';

export const Routes = [
    { method: "get", route: "/users", controller: UserController, action: "all" },
    { method: "get", route: "/users/:id", controller: UserController, action: "one" },
    { method: "post", route: "/users", controller: UserController, action: "save" },
    { method: "post", route: "/users/create", controller: UserController, action: "createUser" },
    { method: "post", route: "/users/auth", controller: UserController, action: "auth" },
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },

    { method: "get", route: "/category", controller: CategoryController, action: "all" },
    { method: "get", route: "/category/:id", controller: CategoryController, action: "one" },
    { method: "post", route: "/category", controller: CategoryController, action: "save" },
    { method: "delete", route: "/category/:id", controller: CategoryController, action: "remove" },

    { method: "get", route: "/subcategory", controller: SubCategoryController, action: "all" },
    { method: "get", route: "/subcategory/:id", controller: SubCategoryController, action: "one" },
    { method: "post", route: "/subcategory", controller: SubCategoryController, action: "save" },
    { method: "delete", route: "/subcategory/:id", controller: SubCategoryController, action: "remove" },

    { method: "get", route: "/question", controller: QuestionController, action: "all" },
    { method: "get", route: "/question/:id", controller: QuestionController, action: "one" },
    { method: "post", route: "/question", controller: QuestionController, action: "save" },
    { method: "delete", route: "/question/:id", controller: QuestionController, action: "remove" }
];