import React, {ChangeEvent} from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'
import {selectOptions} from "@testing-library/user-event/dist/select-options";

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id  = 'hw15',
    }
) => {
    const lastPage = Math.ceil(totalCount/itemsCountForPage) // пишет студент // вычислить количество страниц

    const onChangeCallback = (event: any, page: number) => {
        // пишет студент
        onChange(page,itemsCountForPage)
    }

    const onChangeSelect = (changeValue: number) => {
        onChange(page,changeValue)
    }

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                sx={{
                    button:
                        {
                            borderRadius: '6px',
                            backgroundColor:'blue',
                            color:'ghostwhite',
                            marginBottom:'10px',
                            "&:hover":{color:'blue',backgroundColor: '#f5f5f5'},
                            "&:focus":{color:'darkblue'}
                        }
                        
                    // стили для Pagination // пишет студент
                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
            />

            <span className={s.text1}>
                показать
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChangeOption={onChangeSelect}
            />

            <span className={s.text2} >
                строк в таблице
            </span>
        </div>
    )
}

export default SuperPagination
