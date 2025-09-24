export interface task {
    name: string
    type: string
    label: string
    placeholder: string
    required: boolean
}

export const userTask: task[] = [
    {
        name: "taskOne",
        type: "text",
        label: "TaskOne",
        placeholder: "Enter your country",
        required: true,
    },
    {
        name: "taskTwo",
        type: "text",
        label: "TaskTwo",
        placeholder: "Enter your country",
        required: true,
    },
    {
        name: "taskThree",
        type: "text",
        label: "TaskThree",
        placeholder: "Enter your g-mail",
        required: true,
    },
    {
        name: "taskFour",
        type: "text",
        label: "TaskFour",
        placeholder: "Enter your password",
        required: true,
    },
    {
        name: "taskFive",
        type: "text",
        label: "TaskFive",
        placeholder: "Enter your password",
        required: true,
    }
]