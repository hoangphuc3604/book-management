
import { useAuthors } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { BookForm } from "@/components/BookForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddBook = () => {
  const { data: authors, isLoading, error } = useAuthors();

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
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Thêm Sách Mới</h1>
          
          {isLoading && <p>Đang tải dữ liệu tác giả...</p>}
          
          {error && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
              <p>Có lỗi xảy ra khi tải dữ liệu tác giả. Vui lòng thử lại sau.</p>
            </div>
          )}
          
          {!isLoading && !error && authors && authors.length === 0 && (
            <div className="bg-muted/30 text-center p-6 rounded-lg border mb-6">
              <h2 className="font-medium mb-2">Chưa có tác giả nào</h2>
              <p className="text-muted-foreground mb-4">Bạn cần thêm ít nhất một tác giả trước khi thêm sách.</p>
              <Button asChild>
                <Link to="/authors/new">Thêm tác giả</Link>
              </Button>
            </div>
          )}
          
          {!isLoading && !error && authors && authors.length > 0 && (
            <BookForm authors={authors} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBook;
