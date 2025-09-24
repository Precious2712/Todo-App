export interface signupAuth {
    name: string
    type: string
    label: string
    placeholder: string
    required: boolean
}

export const register: signupAuth[] = [
    {
        name: "firstName",
        type: "text",
        label: "FirstName",
        placeholder: "Enter your country",
        required: true,
    },
    {
        name: "lastName",
        type: "text",
        label: "lastName",
        placeholder: "Enter your country",
        required: true,
    },
    {
        name: "email",
        type: "text",
        label: "G mail",
        placeholder: "Enter your g-mail",
        required: true,
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        required: true,
    }
]