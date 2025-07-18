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
import type { Book } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
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
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const defaultColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Title",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "format",
    header: "Format",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "published_date",
    header: "Published Date",
    cell: (props: any) => {
      const date: Date = props.getValue();
      return <p>{date.toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "publisher",
    header: "publisher",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
];
export const BooksTable = ({ data }: { data: Book[] }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });
  return (
    <div className="flex flex-col space-y-6">
      <div className="inline-flex h-full   gap-2 border border-gray-300 shadow rounded px-2 py-1 w-auto ">
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
