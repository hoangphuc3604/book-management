
import { useAuthors } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { AuthorCard } from "@/components/AuthorCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, User } from "lucide-react";

const AuthorList = () => {
  const { data: authors, isLoading, error } = useAuthors();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Danh sách Tác giả</h1>
            <p className="text-muted-foreground">Quản lý và xem tất cả các tác giả.</p>
          </div>
          <Button asChild>
            <Link to="/authors/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Thêm tác giả
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
            <p>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
          </div>
        )}

        {!isLoading && !error && authors?.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-lg border">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">Chưa có tác giả nào</h2>
            <p className="text-muted-foreground mb-6">Bắt đầu thêm tác giả để xem họ ở đây.</p>
            <Button asChild>
              <Link to="/authors/new">
                <Plus className="mr-2 h-4 w-4" />
                Thêm tác giả đầu tiên
              </Link>
            </Button>
          </div>
        )}

        {!isLoading && !error && authors && authors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorList;
