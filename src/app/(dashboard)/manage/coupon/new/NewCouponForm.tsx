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
import { couponFormSchema, CouponType, couponTypes } from "@/constants";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { debounce } from "lodash";
import { getAllCourses } from "@/lib/actions/course.actions";
import { ICourse } from "@/app/database/course.model";
import { IconClose } from "@/components/icons";
import { Checkbox, InputFormatCurrency } from "@/components/ui";
import { useRouter } from "next/navigation";

const NewCouponForm = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      title: "",
      code: "",
      start_date: undefined,
      end_date: undefined,
      active: true,
      value: 0,
      type: CouponType.PERCENT,
      courses: [],
      limit: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    try {
      const couponType = values.type;
      const couponValue = typeof values.value === 'string' || typeof values.value === 'number'
        ? Number(String(values.value).replace(/,/g, ""))
        : 0;
      
      if (
        couponType === CouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError("value", {
          message: "Giá trị không hợp lệ",
        });
        return;
      }
      const newCoupon = await createCoupon({
        ...values,
        value: couponValue,
        type: values.type || CouponType.PERCENT,
        start_date: startDate,
        end_date: endDate,
        courses: selectedCourses.map((course) => course._id),
      });
      if (newCoupon.error) {
        toast.error(newCoupon.error);
        return;
      }
      if (newCoupon.code) {
        toast.success("Tạo mã giảm giá thành công");
        router.push("/manage/coupon");
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
  };

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
                    className="font-bold uppercase"
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
            name="start_date"
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
            name="end_date"
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
                <FormControl className="h-12">
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
                <>
                  {couponTypeWatch === CouponType.PERCENT ? (
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  ) : (
                    <InputFormatCurrency
                      {...field}
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  )}
                </>
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
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
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
        <Button
          variant="primary"
          type="submit"
          className="w-[150px] ml-auto flex"
        >
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default NewCouponForm;
