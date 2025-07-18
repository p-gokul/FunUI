/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Book, BookFormat, BookGenre } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type RowData,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const BOOK_FORMATS: BookFormat[] = [
  "Hardcover",
  "Paperback",
  "eBook",
  "Audiobook",
];

const BOOK_GENRES: BookGenre[] = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Biography",
  "History",
  "Horror",
];

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

const defaultColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Title",
    cell: (props: any) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: (props: any) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    accessorKey: "format",
    header: "Format",
    cell: (props: any) => <p>{props.getValue()}</p>,
    meta: {
      filterVariant: "select",
    },
    enableSorting: false,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: (props: any) => <p>{props.getValue()}</p>,
    meta: {
      filterVariant: "select",
    },
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props: any) => <p>{props.getValue()}</p>,
    meta: {
      filterVariant: "range",
    },
    enableSorting: true,
  },
  {
    accessorKey: "published_date",
    header: "Published Date",
    cell: (props: any) => {
      const date: Date = props.getValue();
      return <p>{date.toLocaleDateString()}</p>;
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "publisher",
    header: "publisher",
    cell: (props: any) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: (props: any) => <p>{props.getValue()}</p>,
    enableSorting: true,
    enableColumnFilter: false,
  },
];

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const getSelectOptions = () => {
    if (column.id === "format") return BOOK_FORMATS;
    if (column.id === "genre") return BOOK_GENRES;
    return [];
  };

  return filterVariant === "range" ? (
    <div className="flex space-x-2">
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : filterVariant === "select" ? (
    <Select
      onValueChange={(value) =>
        column.setFilterValue(value === "all" ? undefined : value)
      }
      value={(columnFilterValue ?? "all") as string}
    >
      <SelectTrigger className="w-[180px] border shadow rounded-lg">
        <SelectValue placeholder="Select value" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {getSelectOptions().map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-6"
    />
  );
}

export const BooksTable = ({ data }: { data: Book[] }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {},
    state: {
      columnVisibility,
      pagination,
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="flex flex-col space-y-6">
      <div className="inline-flex h-full   gap-2 border border-gray-300 shadow rounded px-2 py-1 max-w-2/3 ">
        <label className="flex items-center gap-1 ">
          <Checkbox
            checked={table.getIsAllColumnsVisible()}
            onCheckedChange={(value) => {
              table.toggleAllColumnsVisible(!!value);
            }}
          />
          Toggle All
        </label>
        <div>
          <Separator orientation="vertical" className="border-[2px] " />
        </div>

        {table.getAllLeafColumns().map((column, index, arr) => (
          <div key={column.id} className="flex gap-4">
            <label className="flex items-center gap-1 ">
              <Checkbox
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                }}
              />
              {column.id}
            </label>
            {index < arr.length - 1 && (
              <Separator orientation="vertical" className=" border-[1px]" />
            )}
          </div>
        ))}
      </div>
      <div>
        <Table>
          <TableCaption>
            <div className="flex justify-between items-center py-2 px-4">
              <div className="flex items-center gap-2">
                <span>No. of Rows</span>
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40].map((pageSize) => (
                      <SelectItem key={pageSize} value={String(pageSize)}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem className="cursor-pointer">
                      <PaginationLink
                        href="#"
                        aria-label="Go to previous page"
                        size="default"
                        className={
                          table.getCanPreviousPage()
                            ? ""
                            : "pointer-events-none opacity-50"
                        }
                        onClick={() => table.previousPage()}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    {/* First page */}
                    <PaginationItem>
                      <PaginationLink
                        isActive={table.getState().pagination.pageIndex === 0}
                        onClick={() => table.setPageIndex(0)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {/* Ellipsis before middle pages */}
                    {table.getState().pagination.pageIndex > 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Middle page range */}
                    {Array.from({ length: table.getPageCount() }, (_, i) => i)
                      .filter((i) => {
                        const current = table.getState().pagination.pageIndex;
                        return (
                          i !== 0 &&
                          i !== table.getPageCount() - 1 &&
                          Math.abs(current - i) <= 1
                        );
                      })
                      .map((i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={
                              table.getState().pagination.pageIndex === i
                            }
                            onClick={() => table.setPageIndex(i)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {/* Ellipsis after middle pages */}
                    {table.getState().pagination.pageIndex <
                      table.getPageCount() - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {table.getPageCount() > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          isActive={
                            table.getState().pagination.pageIndex ===
                            table.getPageCount() - 1
                          }
                          onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                          }
                        >
                          {table.getPageCount()}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem className="cursor-pointer">
                      <PaginationLink
                        href="#"
                        aria-label="Go to next page"
                        size="default"
                        className={
                          table.getCanNextPage()
                            ? ""
                            : "pointer-events-none opacity-50"
                        }
                        onClick={() => table.nextPage()}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="[&>*]:border [&>*]:border-border"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                          {header.column.getCanFilter() ? (
                            <div onClick={(e) => e.stopPropagation()}>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="[&>*]:border [&>*]:border-border odd:bg-muted/90"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
