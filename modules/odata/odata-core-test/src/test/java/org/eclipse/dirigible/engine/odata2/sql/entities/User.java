/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2022 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipse.dirigible.engine.odata2.sql.entities;

import org.apache.olingo.odata2.api.annotation.edm.*;

import java.util.List;

@EdmEntityType(name = "User")
@EdmEntitySet(name = "Users")
public class User {
    static final String USER_2_GROUP_ASSOCIATION = "UserToGroup";

    @EdmKey
    @EdmProperty
    private String id;

    @EdmProperty
    private String firstname;

    @EdmNavigationProperty(toMultiplicity = EdmNavigationProperty.Multiplicity.MANY, toType = Group.class, association = USER_2_GROUP_ASSOCIATION)
    private List<Group> groups;
}
