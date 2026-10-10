# open a pool of connections with db

from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

from app.config import settings

pool = ConnectionPool(
    conninfo=settings.database_url,
    open=False,
    kwargs={"row_factory": dict_row},
    check=ConnectionPool.check_connection,
)