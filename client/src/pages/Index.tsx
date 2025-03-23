
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, PlusCircle, User } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Hệ thống Quản lý Sách và Tác giả
          </h1>
          <p className="text-xl text-muted-foreground">
            Quản lý danh sách sách và tác giả một cách dễ dàng. Thêm, xem và cập nhật thông tin sách và tác giả.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="border rounded-lg p-8 flex flex-col items-center text-center bg-gradient-2 shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-foreground">Quản lý Sách</h2>
              <p className="text-muted-foreground mt-2 mb-6">
                Xem danh sách sách, thêm sách mới và quản lý thông tin chi tiết của mỗi cuốn sách.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild variant="outline" className="btn-secondary-effect">
                  <Link to="/books">
                    <Book className="mr-2 h-4 w-4" />
                    Xem danh sách
                  </Link>
                </Button>
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground btn-secondary-effect">
                  <Link to="/books/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm sách mới
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-8 flex flex-col items-center text-center bg-gradient-1 shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary-foreground">Quản lý Tác giả</h2>
              <p className="text-muted-foreground mt-2 mb-6">
                Xem danh sách tác giả, thêm tác giả mới và quản lý thông tin chi tiết của mỗi tác giả.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild variant="outline" className="btn-primary-effect">
                  <Link to="/authors">
                    <User className="mr-2 h-4 w-4" />
                    Xem danh sách
                  </Link>
                </Button>
                <Button asChild className="btn-primary-effect">
                  <Link to="/authors/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm tác giả mới
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
