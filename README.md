concepts of multer to store files in the server



From the client side, we receive a multipart/form-data (usually from a form submission with a file.
We use Multer to: This is what actually the middleware upload.single('file') does before executing the route defined function uploadfile.


    1. Parse the incoming multipart data, so Node.js can understand and use it.

    2. Extract files and store them according to a configured storage engine.

    3. The storage engine decides:

        Where the file will be saved on the server (destination)

        What filename to use for the saved file (filename)

    4. upload.single('file') is what intercepts the request and processes the multipart/form-data.

        It parses the file and, using the storage config you gave, physically writes the file to upload/ folder on your   server.

    5. After this process, multer attaches the file details to the req object:

       req.file (for single uploads)

       req.files (for multiple)
