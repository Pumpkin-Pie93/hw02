import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
	// и + ещё пропсы которых нет в стандартном инпуте
	onChangeText?: (value: string) => void
	onEnter?: () => void
	error?: ReactNode
	spanClassName?: string
	value?: string
} // илм экспортировать тип SuperInputTextPropsType
	& { // плюс специальный пропс SuperPagination
	onDebouncedChange?: (value: string) => void
}

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = (
	{
		onChangeText,
		onDebouncedChange,
		value,
		
		...restProps // все остальные пропсы попадут в объект restProps
	}
) => {
	const [timerId, setTimerId] = useState<number | undefined>(undefined)
	
	// const onChangeTextCallback = (value: string) => {
	// 	onChangeText?.(value)
	//
	// 		if (onDebouncedChange) {
	// 			if(timerId){
	// 			clearTimeout(timerId)
	// 		}
	// 			// делает студент
	// 			const newTimerId = setTimeout(() => {
	// 				setTimerId(undefined)
	//
	// 				onDebouncedChange(value)
	// 			}, 1500)
	// 			setTimerId(newTimerId)
	// 		}
	//
	// }
	// 			// остановить предыдущий таймер
	// 			// запустить новый на 1500ms, в котором вызовется функция
	//
	// 	//
	
	const onChangeTextCallback = (value: string) => {
		onChangeText?.(value);
		
		if (onDebouncedChange) {
			if (timerId !== undefined) {
				// Останавливаем предыдущий таймер, если существует
				clearTimeout(timerId);
			}
			
			let newTimerId = setTimeout(() => {
				//setTimerId(undefined);
				onDebouncedChange(value);
			}, 1500) as unknown as number;
			
			setTimerId(newTimerId);
		}
	}
	
	
	return (
		<SuperInputText  value={value}  onChangeText={onChangeTextCallback} {...restProps}/>
	)
}

export default SuperDebouncedInput
