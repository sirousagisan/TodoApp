## todo

> GET */todo*   - get all todo [jwt]

> POST */todo*  - create todo [refresh, jwt, csrf] . 

> GET */todo/{id}* - get single todo [refresh, jwt]

> PUT */todo/{id}* - update todo [refresh, jwt, csrf]

> DELETE *todo/{id}* - delete todo [refresh, jwt, csrf]

## auth

> POST *auth/register* - signup [csrf]

> POST *auth/login* - signin [csrf]

> POST *auth/logout* - logout [csrf]