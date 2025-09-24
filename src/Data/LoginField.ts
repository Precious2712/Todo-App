export interface loginAuth {
    name: string
    type: string
    label: string
    placeholder: string
    required: boolean
}

export const checkin: loginAuth[] = [
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