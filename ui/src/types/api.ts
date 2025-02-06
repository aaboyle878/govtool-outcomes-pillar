interface GovernanceAction {
  id: string;
  tx_hash: string;
  index: number;
  type: string;
  description: {} | null;
  expiry_date: string;
  expiration: number;
  time: string;
  epoch_no: number;
  url: string;
  data_hash: string;
  proposal_params: {} | null;
  title: string | null;
  abstract: string | null;
  status: Status;
  status_times: StatusTimes;
}

type Status = {
  ratified_epoch: number | null;
  enacted_epoch: number | null;
  dropped_epoch: number | null;
  expired_epoch: number | null;
};

type StatusTimes = {
  ratified_time: string | null;
  enacted_time: string | null;
  dropped_time: string | null;
  expired_time: string | null;
};
