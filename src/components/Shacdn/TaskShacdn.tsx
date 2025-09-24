'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from "../ui/form"
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { task } from "@/Data/Task";
import { TaskForm } from "../FormSchema/ShacdnForm";

interface signupShadcnProps extends task {
    control: Control<TaskForm>;
}

export function ShacdTask({
    name,
    type,
    label,
    placeholder,
    required,
    control
}: signupShadcnProps) {

    const renderField = () => {
        switch (type) {
            case "text":
                return (
                    <FormField
                        control={control}
                        name={name as keyof TaskForm}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input
                                            placeholder={placeholder}
                                            {...field}
                                            required={required}
                                            type="text"
                                            className=""
                                        />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            default:
                return null;
        }
    };
    return (
        <div>
            {renderField()}
        </div>
    )
}