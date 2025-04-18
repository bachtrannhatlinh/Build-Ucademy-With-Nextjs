"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { CouponType, couponTypes } from "@/constants";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { debounce } from "lodash";
import { getAllCourses } from "@/lib/actions/course.actions";
import { ICourse } from "@/app/database/course.model";
import { IconClose } from "@/components/icons";
import { Checkbox } from "@/components/ui";
const formSchema = z.object({
  title: z.string({
    message: "Tiêu đề không được để trống",
  }),
  code: z
    .string({
      message: "Mã giảm giá không được để trống",
    })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  value: z.number().optional(),
  type: z.string().optional(),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
const NewCouponForm = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([]);
  const [selectedCourses, setSelectedCourses] = useState<ICourse[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      startDate: undefined,
      endDate: undefined,
      active: true,
      value: 0,
      type: CouponType.PERCENT,
      courses: [],
      limit: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesToSend = {
      ...values,
      type: couponTypeWatch || CouponType.PERCENT,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      courses: selectedCourses.map((course) => course._id),
    };
    try {
      const newCoupon = await createCoupon(valuesToSend);
      if (newCoupon.code) {
        toast.success("Tạo mã giảm giá thành công");
        form.reset();
        setStartDate(undefined);
        setEndDate(undefined);
        setFindCourse([]);
        setSelectedCourses([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const couponTypeWatch = form.watch("type");

  const handleFindCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const courseName = e.target.value;
        const resp = await getAllCourses({ search: courseName });
        setFindCourse(resp);
      } catch (error) {
        console.error("Error searching for courses:", error);
      }
    },
    1000
  );

  const handleSelectCourse = (checked: boolean | string, course: ICourse) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course]);
    }
    if (!checked) {
      setSelectedCourses((prev) =>
        prev.filter((item) => item._id !== course._id)
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mã giảm giá"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={CouponType.PERCENT}
                    className="flex gap-5"
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        className="flex items-center space-x-2"
                        key={type.value}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value}>{type.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="50%"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tìm kiếm khóa học..."
                    onChange={(e) => handleFindCourse(e)}
                  />
                  {findCourse && findCourse.length > 0 && (
                    <div className="flex flex-col gap-2 !mt-5">
                      {findCourse?.map((course) => (
                        <Label
                          key={course.title}
                          className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                          htmlFor={course.title}
                        >
                          <Checkbox
                            id={course.title}
                            onCheckedChange={(checked) =>
                              handleSelectCourse(checked, course)
                            }
                            checked={selectedCourses.some(
                              (el) => el._id === course._id
                            )}
                          />
                          <span>{course.title}</span>
                        </Label>
                      ))}
                    </div>
                  )}
                  {selectedCourses.length > 0 && (
                    <div className="flex items-start flex-wrap gap-2 !mt-5">
                      {selectedCourses?.map((course) => (
                        <div
                          key={course.title}
                          className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                        >
                          <span>{course.title}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectCourse(false, course)}
                          >
                            <IconClose className="size-5 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="primary" className="w-[150px] ml-auto flex">
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default NewCouponForm;
