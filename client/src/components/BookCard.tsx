
import { Book } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book as BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookIcon className="h-5 w-5" />
          {book.name}
        </CardTitle>
        <CardDescription>Thể loại: {book.genre}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Tác giả: {book.author?.name || "Không xác định"}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/books/${book.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
