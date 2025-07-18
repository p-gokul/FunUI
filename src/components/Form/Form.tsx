import { useForm } from "react-hook-form";
import { BookSchema, type BookFields } from "@/types_&_schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";

function Form() {
  const methods = useForm<BookFields>({
    resolver: zodResolver(BookSchema),
  });
  return <div>Form</div>;
}

export default Form;
