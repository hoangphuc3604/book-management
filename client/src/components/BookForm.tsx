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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Author } from "@/types";
import { useAddBook } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const bookSchema = z.object({
    name: z.string().min(1, "Tên sách không được để trống"),
    genre: z.string().min(1, "Thể loại không được để trống"),
    authorId: z.string().min(1, "Vui lòng chọn tác giả"),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
    authors: Author[];
}

export function BookForm({ authors }: BookFormProps) {
    const navigate = useNavigate();
    const { mutateAsync: addBook, isPending } = useAddBook();

    const form = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            name: "",
            genre: "",
            authorId: "",
        },
    });

    const onSubmit = async (values: Required<BookFormValues>) => {
        try {
            await addBook(values);
            toast.success("Thêm sách thành công!");
            navigate("/books");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm sách");
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
                            <FormLabel>Tên sách</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên sách" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thể loại</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập thể loại" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tác giả</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn tác giả" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {authors.map((author) => (
                                        <SelectItem
                                            key={author._id}
                                            value={author._id}
                                        >
                                            {author.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Đang xử lý..." : "Thêm sách"}
                </Button>
            </form>
        </Form>
    );
}
