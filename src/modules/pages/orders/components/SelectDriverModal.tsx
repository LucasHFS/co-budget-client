import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "../Order.module.scss";
import { useDriver } from "@/modules/drivers";

export const SelectDriverModal = ({open, onClose, setDriverId, driverId,handleSendSelected}:any) => {
  const { drivers } = useDriver();

  return(
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="black">Selecionar Motorista</DialogTitle>
      <DialogContent className={styles.dialog_content}>
      <form onSubmit={handleSendSelected}>
        <div className={styles.eventSelectContainer}>
          <InputLabel
            id={`driver-label`}
            sx={{ color: 'black' }}
          >
            Motorista
          </InputLabel>
          <Select
            labelId={`driver-label`}
            name={`driver`}
            id={`budget`}
            value={driverId}
            label="Orçamento"
            required
            onChange={(e) => {
              setDriverId(e.target.value);
            }}
            sx={{ minWidth: '200px', color: '#e0e0e2' }}
          >
            {drivers.map((driver) => (
              <MenuItem key={`${driver.name}-${driver.id}`} value={driver.id} className={styles.menuItem}>{driver.name}</MenuItem>
            ))}
          </Select>
        </div>

        <DialogActions>
          <Button onClick={onClose} color="warning" variant="contained">Sair</Button>
          <Button type="submit" variant="contained">Selecionar</Button>
        </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  )
}
