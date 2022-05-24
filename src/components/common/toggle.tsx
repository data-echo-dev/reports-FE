import React, { FC } from 'react'

interface Props {
  label: string
  name: string
  checked: boolean
  disabled?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Toggle: FC<Props> = ({
  label,
  name,
  disabled = false,
  checked,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="flex flex-col cursor-pointer label">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default Toggle
