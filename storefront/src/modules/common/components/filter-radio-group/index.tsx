import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-4 m-5">
      {/* Minimal Header */}
      <Text className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {title}
      </Text>

      {/* Clean Radio Group */}
      <RadioGroup 
        data-testid={dataTestId} 
        onValueChange={handleChange}
        className="space-y-1"
      >
        {items?.map((item) => {
          const isSelected = item.value === value
          
          return (
            <label
              key={item.value}
              htmlFor={item.value}
              className={clx(
                "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-150",
                {
                  "bg-slate-800 text-white": isSelected,
                  "text-slate-600 hover:bg-slate-50 hover:text-slate-800": !isSelected,
                }
              )}
            >

              {/* Hidden Radio Input */}
              <RadioGroup.Item
                checked={isSelected}
                className="sr-only"
                id={item.value}
                value={item.value}
              />

              {/* Label */}
              <span className={clx(
                "text-sm font-medium transition-colors",
                {
                  "text-white": isSelected,
                  "text-slate-600": !isSelected,
                }
              )}>
                {item.label}
              </span>
            </label>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup