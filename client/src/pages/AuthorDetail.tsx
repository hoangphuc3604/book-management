import { useAuthor } from "@/lib/api";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Book, User } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AuthorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data: author, isLoading, error } = useAuthor(id || "");

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 container py-8">
                <div className="mb-6">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mb-6"
                    >
                        <Link to="/authors" className="flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại danh sách
                        </Link>
                    </Button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <p>Đang tải thông tin tác giả...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                        <p>
                            Có lỗi xảy ra khi tải thông tin tác giả. Vui lòng
                            thử lại sau.
                        </p>
                    </div>
                )}

                {!isLoading && !error && author && (
                    <div className="max-w-4xl mx-auto">
                        <Card className="mb-8">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="h-6 w-6" />
                                    <CardTitle className="text-2xl">
                                        {author.name}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Tuổi: {author.age}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        Danh sách sách của tác giả
                                    </h3>

                                    {author.books.length === 0 ? (
                                        <div className="text-center py-6 bg-muted/30 rounded-md">
                                            <Book className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-muted-foreground">
                                                Tác giả này chưa có sách nào
                                            </p>
                                        </div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Tên sách
                                                    </TableHead>
                                                    <TableHead>
                                                        Thể loại
                                                    </TableHead>
                                                    <TableHead className="text-right">
                                                        Hành động
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {author.books.map((book) => (
                                                    <TableRow key={book._id}>
                                                        <TableCell className="font-medium">
                                                            {book.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {book.genre}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                asChild
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <Link
                                                                    to={`/books/${book._id}`}
                                                                >
                                                                    Xem chi tiết
                                                                </Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorDetail;
