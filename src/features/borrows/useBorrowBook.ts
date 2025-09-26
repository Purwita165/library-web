import { useMutation } from "@tanstack/react-query";
import { borrowBook, BorrowResponse } from "./api";

export function useBorrowBook() {
  return useMutation<BorrowResponse, Error, string>({
    mutationFn: (bookId) => borrowBook(bookId),
  });
}
