import { Fab, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { formatDate } from "@/modules/utils/date";
import { useSaleEvent } from "@/modules/orders";
import styles from "../Order.module.scss";
import AddIcon from '@mui/icons-material/Add';
import Router from 'next/router'

export const SaleEventSelect = ({}) =>{
  const { selectedSaleEventId, setselectedSaleEventId, saleEvents } = useSaleEvent()

  const redirectToEvents = () => {
    Router.push('/sale-events')
  }

  return (
    <FormControl>
      <div className={styles.eventSelectContainer}>
        <InputLabel
          id={`saleEvent-label`}
          sx={{ color: '#e0e0e2' }}
        >
          Evento
        </InputLabel>
        <Select
          labelId={`saleEvent-label`}
          name={`saleEvent`}
          id={`saleEvent`}
          value={selectedSaleEventId}
          label="Evento"
          required
          onChange={(e) => {
            setselectedSaleEventId(e.target.value);
          }}
          sx={{ minWidth: '200px', color: '#e0e0e2' }}
        >
          {saleEvents.map((saleEvent) => (
            <MenuItem key={`${saleEvent.name}-${saleEvent.date}`} value={saleEvent.id} className={styles.menuItem}>{formatDate(saleEvent.date)} - {saleEvent.name}</MenuItem>
          ))}
        </Select>

        {/* @ts-ignore */}
        <Fab aria-label="add" color="white" onClick={redirectToEvents}>
          {/* @ts-ignore */}
          <AddIcon color="black"/>
        </Fab>
      </div>
    </FormControl>
  )
}
