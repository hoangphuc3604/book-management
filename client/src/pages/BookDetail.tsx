
import { useBook } from "@/lib/api";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowLeft, Book as BookIcon, User } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBook(id || "");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link to="/books" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <p>Đang tải thông tin sách...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md">
            <p>Có lỗi xảy ra khi tải thông tin sách. Vui lòng thử lại sau.</p>
          </div>
        )}

        {!isLoading && !error && book && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BookIcon className="h-6 w-6" />
                  <CardTitle className="text-2xl">{book.name}</CardTitle>
                </div>
                <CardDescription>Thể loại: {book.genre}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div>
                  <h3 className="font-medium mb-2">Thông tin sách</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Tên sách</span>
                      <span className="font-medium">{book.name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Thể loại</span>
                      <span className="font-medium">{book.genre}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Thông tin tác giả</h3>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <h4 className="font-medium">{book.author.name}</h4>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/authors/${book.author.id}`}>Xem chi tiết</Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Tên tác giả</span>
                        <span className="font-medium">{book.author.name}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Tuổi</span>
                        <span className="font-medium">{book.author.age}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
