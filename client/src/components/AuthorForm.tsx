import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddAuthor } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const authorSchema = z.object({
    name: z.string().min(1, "Tên tác giả không được để trống"),
    age: z.coerce.number().min(1, "Tuổi phải lớn hơn 0"),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

export function AuthorForm() {
    const navigate = useNavigate();
    const { mutateAsync: addAuthor, isPending } = useAddAuthor();

    const form = useForm<AuthorFormValues>({
        resolver: zodResolver(authorSchema),
        defaultValues: {
            name: "" as string,
            age: 0 as number,
        },
    });

    const onSubmit = async (values: Required<AuthorFormValues>) => {
        try {
            await addAuthor(values);
            toast.success("Thêm tác giả thành công!");
            navigate("/authors");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm tác giả");
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên tác giả</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nhập tên tác giả"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tuổi</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Nhập tuổi"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Đang xử lý..." : "Thêm tác giả"}
                </Button>
            </form>
        </Form>
    );
}
