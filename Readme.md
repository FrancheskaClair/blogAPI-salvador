# Blog API - Documentation

## Resources

- Admin User
    - email: "admin@gmail.com"
    - password: "admin123"

- Regular User
    - email: "user@gmail.com"
    - password: "pass123"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "username": "req.body.username",
        "password": "samplePw123"
    }

    ```
      
### Blogs

#### [POST] - "/blogs/addBlog"

- Sample Request Body

    ```json

    {
        "title": "Sample: The Blog",
        "content": "Sample L. Jackson"
    }

    ```
- Requires token

#### [GET] - "/blogs/getBlogs"

- No Request Body
- Requires token

#### [GET] - "/blogs/getBlog/:blogId"

- No Request Body
- Requires token

#### [PATCH] - "/blogs/updateBlog/:blogId"

- Sample Request Body

    ```json

    {
        "title": "Sample 2: The Update",
        "content": "Sample L. Jackson"
    }

    ```
- Requires token

#### [DELETE] - "/blogs/deleteBlog/:blogId"

- No Request Body
- Requires token

#### [DELETE] - "/blogs/deleteComment/:blogId/:commentId"

- No Request Body
- Requires token

#### [POST] - "/blogs/addComment/:blogId"

- Sample Request Body

    ```json

    {
        "comment": "Sample 2: The Reckoning is the best sample update of all time.",
    }

    ```
- Requires token

#### [GET] - "/blogs/getComments/:blogId"

- No Request Body
- Requires token