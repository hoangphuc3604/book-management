import { useBooks } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Plus } from "lucide-react";

const BookList = () => {
    const { data: books, isLoading, error } = useBooks();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 container py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Danh sách Sách
                        </h1>
                        <p className="text-muted-foreground">
                            Quản lý và xem tất cả các sách.
                        </p>
                    </div>
                    <Button asChild>
                        <Link to="/books/new" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm sách
                        </Link>
                    </Button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <p>Đang tải dữ liệu...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                        <p>
                            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
                        </p>
                    </div>
                )}

                {!isLoading && !error && books?.length === 0 && (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border">
                        <Book className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-xl font-medium mb-2">
                            Chưa có sách nào
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Bắt đầu thêm sách để xem chúng ở đây.
                        </p>
                        <Button asChild>
                            <Link to="/books/new">
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm sách đầu tiên
                            </Link>
                        </Button>
                    </div>
                )}

                {!isLoading && !error && books && books.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;
