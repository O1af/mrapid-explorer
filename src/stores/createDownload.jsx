import { createResource, createSignal } from 'solid-js';

export default function createDownload(
  client,
  actions,
  state,
  setState
) {
  const [downloadFilters, setDownloadFilters] = createSignal();

  const [measurementsDownload] = createResource(
    downloadFilters,
    client.Downloads.get
  );
  Object.assign(actions, {
    setParameters(parameters) {
      setParameters(parameters);
    },
    setDateFrom(datetime) {
      setDateFrom(datetime);
    },
    setDateTo(datetime) {
      setDateTo(datetime);
    },
    setDownloadFilters(props) {
      setDownloadFilters({
        locationsId: state.location.id,
        dateFrom: props.dateFrom,
        dateTo: props.dateTo,
        parameters: props.parameters,
      });
    },
  });

  return measurementsDownload;
}
