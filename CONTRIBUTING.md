# Contributing to CampusUnify

Thank you for considering contributing to **CampusUnify**! Your contributions, whether they involve bug fixes, new features, or improvements, are highly appreciated. Please follow the guidelines below to ensure smooth collaboration.

## Table of Contents
1. [How to Report a Bug](#how-to-report-a-bug)
2. [Feature Requests](#feature-requests)
3. [Setting Up the Development Environment](#setting-up-the-development-environment)
4. [Coding Guidelines](#coding-guidelines)
5. [Submitting a Pull Request](#submitting-a-pull-request)
6. [Code Review Process](#code-review-process)

---

## How to Report a Bug

To report a bug:
1. Open a new [GitHub issue](https://github.com/PorePranav/CampusUnify/issues).
2. Include a clear and descriptive title.
3. Provide steps to reproduce the issue.
4. Attach screenshots or logs where applicable.

## Feature Requests

For new feature requests:
1. Open a new [GitHub issue](https://github.com/PorePranav/CampusUnify/issues) labeled "Feature Request."
2. Clearly describe the new feature and its use case.
3. Explain why this feature is important.

## Setting Up the Development Environment

Follow these steps to set up your development environment:

1. Clone the repository:
    ```bash
    git clone https://github.com/PorePranav/CampusUnify.git
    cd CampusUnify
    ```

2. Install dependencies:
    ```bash
    # Backend
    cd server
    npm install
    
    # Frontend
    cd ../client
    npm install
    ```

3. Set up environment variables:
    - In `/server` and `/client` directories, create a `.env` file from `.env.example` and fill in the necessary values.

4. Run the application:
    ```bash
    # Run backend and frontend concurrently
    cd server
    npm run start

	cd client
	npm run dev
    ```

## Coding Guidelines
### General Guidelines
- Follow a **consistent coding style** and **folder structure** throughout the project.
- Use meaningful variable and function names (even though variable names can be short).
- Test your code thoroughly before submitting.
- Before pushing your code, make sure to run the following commands:
  - **Linting**: Use `npm run lint` to catch syntax or style issues.
  - **Formatting**: Use `npm run format` to automatically format your code following the project's style rules.
- Always ensure your code is **lint-free** and **formatted** before submitting a pull request.

### Backend (Node.js + Express + MongoDB + Mongoose)
- Use **async/await** for asynchronous operations.
- Use **Mongoose** for database operations.
- **Error Handling**: Use `catchAsync` to wrap asynchronous functions and `AppError` to throw consistent application errors.
    ```javascript
	//Example Use
    const getUser = catchAsync(async (req, res, next) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(new AppError('User not found', 404));
      }
      res.status(200).json(user);
    });
    ```

- Middleware: Ensure proper use of `AppError` for any route or middleware error handling.

### Frontend (React + TanStack Query + Axios)
- **Tailwind CSS**: Use **Tailwind CSS** for styling. Keep component-specific styles concise by using utility-first classes.
- **React Query**: Utilize **TanStack/react-query** for fetching, caching, and synchronizing server state.
    - Use `useQuery` and `useMutation` for data fetching and mutations.
    - For consistent and reusable logic, create **custom hooks** for query and mutation logic:
    ```javascript
    import { useQuery, useMutation } from '@tanstack/react-query';
    
    // Custom hook for fetching data
    export const useGetData = () => {
      return useQuery(['data'], fetchData);
    };
    
    // Custom hook for mutations
    export const usePostData = () => {
      return useMutation(postData);
    };
    ```

- **Axios**: Use **Axios** for HTTP requests.
    ```javascript
    import axios from 'axios';
    
    export default axios.create({
      baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    });

    export default axiosInstance;
    ```
## Submitting a Pull Request

1. **Fork** the repository and create a new branch:
    ```bash
    git checkout -b feature/my-new-feature
    ```

2. **Commit** your changes:
    ```bash
    git commit -m "Add new feature"
    ```

3. **Push** your branch:
    ```bash
    git push origin feature/my-new-feature
    ```

4. Open a **Pull Request** into the main repository's `dev` branch. Ensure your PR description is clear and references any related issue(s).

## Code Review Process

Submitted pull requests will be reviewed by maintainers. Expect feedback to ensure:
- Code quality and readability.
- No regressions or new bugs.
- Compliance with the project's goals and coding standards.

---

By following these guidelines, you help ensure that **CampusUnify** continues to improve. Thank you for contributing!