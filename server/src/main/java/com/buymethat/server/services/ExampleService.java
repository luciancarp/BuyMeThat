package com.buymethat.server.services;

import com.buymethat.db.tables.pojos.ExampleTable;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.buymethat.db.tables.ExampleTable.EXAMPLE_TABLE;

@Service
public class ExampleService {

  private DSLContext dsl;

  public ExampleService(DSLContext dsl) {
    this.dsl = dsl;
  }

  public List<ExampleTable> getName(String name) {
    return dsl
        .select()
        .from(EXAMPLE_TABLE)
        .where(EXAMPLE_TABLE.NAME.eq(name))
        .fetch()
        .into(ExampleTable.class);
  }
}
